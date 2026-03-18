#!/usr/bin/env python3
"""
Download vehicle images from Pexels API and update inventory.js with imageUrl fields.

Usage:
    python3 download-pexels-images.py <PEXELS_API_KEY>

Downloads one image per vehicle into public/vehicles/<vehicle-id>.jpg
and updates src/data/inventory.js to set each vehicle's imageUrl.
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.error

API_BASE = "https://api.pexels.com/v1/search"
INVENTORY_PATH = "src/data/inventory.js"
OUTPUT_DIR = "public/vehicles"
MANIFEST_PATH = "/tmp/vehicles_manifest.json"


def search_pexels(query, api_key, per_page=1):
    """Search Pexels and return the first result's medium-sized image URL."""
    url = f"{API_BASE}?query={urllib.parse.quote(query)}&per_page={per_page}&orientation=landscape"
    req = urllib.request.Request(url, headers={"Authorization": api_key, "User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            if data.get("photos"):
                return data["photos"][0]["src"]["large"]
    except urllib.error.HTTPError as e:
        print(f"  API error {e.code}: {e.reason}")
    except Exception as e:
        print(f"  Error: {e}")
    return None


def download_image(image_url, dest_path):
    """Download an image to a local file."""
    req = urllib.request.Request(image_url, headers={
        "User-Agent": "Mozilla/5.0"
    })
    with urllib.request.urlopen(req) as resp:
        with open(dest_path, "wb") as f:
            f.write(resp.read())


def build_search_query(vehicle):
    """Build a Pexels search query for a vehicle."""
    make = vehicle["make"]
    model = vehicle["model"]
    year = vehicle["year"]
    color = vehicle["exteriorColor"]

    # Simplify color names: just use the first word if it's a recognizable color
    simple_colors = {
        "black", "white", "red", "blue", "silver", "gray", "grey", "green",
        "brown", "gold", "orange", "yellow", "beige", "bronze", "maroon",
    }
    color_word = ""
    for word in color.lower().split():
        if word in simple_colors:
            color_word = word
            break

    # Primary query: year make model color
    query = f"{year} {make} {model}"
    if color_word:
        query = f"{color_word} {query}"
    return query


def build_fallback_queries(vehicle):
    """Build fallback search queries if primary fails."""
    make = vehicle["make"]
    model = vehicle["model"]
    body = vehicle["bodyStyle"]
    return [
        f"{make} {model} car",
        f"{make} {model}",
        f"{make} {body.lower()}",
        f"{body.lower()} car",
    ]


def update_inventory_file(vehicle_id, image_path):
    """Update the imageUrl field for a vehicle in inventory.js."""
    with open(INVENTORY_PATH, "r") as f:
        content = f.read()

    # Find the vehicle block by ID and update its imageUrl
    # Pattern: id: "vehicle-id", ... imageUrl: "",
    escaped_id = re.escape(vehicle_id)
    pattern = rf'(id:\s*"{escaped_id}".*?imageUrl:\s*)"(.*?)"'
    replacement = rf'\1"/vehicles/{vehicle_id}.jpg"'
    new_content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)

    if new_content != content:
        with open(INVENTORY_PATH, "w") as f:
            f.write(new_content)
        return True
    return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 download-pexels-images.py <PEXELS_API_KEY>")
        sys.exit(1)

    api_key = sys.argv[1]

    # Load vehicle manifest
    if not os.path.exists(MANIFEST_PATH):
        print(f"Manifest not found at {MANIFEST_PATH}")
        print("Run this from the project root after building the manifest.")
        sys.exit(1)

    with open(MANIFEST_PATH) as f:
        vehicles = json.load(f)

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Downloading images for {len(vehicles)} vehicles...\n")

    success = 0
    failed = []

    for i, v in enumerate(vehicles):
        vid = v["id"]
        dest = os.path.join(OUTPUT_DIR, f"{vid}.jpg")

        # Skip if already downloaded
        if os.path.exists(dest) and os.path.getsize(dest) > 1000:
            print(f"[{i+1}/{len(vehicles)}] SKIP {vid} (already exists)")
            success += 1
            continue

        print(f"[{i+1}/{len(vehicles)}] {v['year']} {v['make']} {v['model']}...", end=" ")

        # Try primary query
        query = build_search_query(v)
        image_url = search_pexels(query, api_key)

        # Try fallback queries if primary fails
        if not image_url:
            for fallback in build_fallback_queries(v):
                image_url = search_pexels(fallback, api_key)
                if image_url:
                    break
                time.sleep(0.2)

        if image_url:
            try:
                download_image(image_url, dest)
                update_inventory_file(vid, dest)
                size_kb = os.path.getsize(dest) / 1024
                print(f"OK ({size_kb:.0f} KB)")
                success += 1
            except Exception as e:
                print(f"DOWNLOAD FAILED: {e}")
                failed.append(vid)
        else:
            print("NO RESULTS")
            failed.append(vid)

        # Rate limiting: Pexels allows 200 req/hour
        time.sleep(0.5)

    print(f"\nDone! {success}/{len(vehicles)} images downloaded.")
    if failed:
        print(f"\nFailed ({len(failed)}):")
        for vid in failed:
            print(f"  - {vid}")


if __name__ == "__main__":
    import urllib.parse
    main()

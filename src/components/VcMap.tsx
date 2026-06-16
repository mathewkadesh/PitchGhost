import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cityCoords } from "../data/cityCoords";
import type { VcDirectoryEntry } from "../lib/types";

interface Props {
  vcs: VcDirectoryEntry[];
}

export default function VcMap({ vcs }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current, {
      center: [42, -20],
      zoom: 3,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18,
    }).addTo(map);

    const byCity = new Map<string, VcDirectoryEntry[]>();
    for (const v of vcs) {
      if (!cityCoords[v.location]) continue;
      const list = byCity.get(v.location) ?? [];
      list.push(v);
      byCity.set(v.location, list);
    }

    byCity.forEach((firms, location) => {
      const [lat, lng] = cityCoords[location];
      const size = 22 + Math.min(firms.length, 8) * 2;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          display:flex;align-items:center;justify-content:center;
          width:${size}px;height:${size}px;
          background:rgba(201,162,75,0.18);border:1.5px solid #c9a24b;border-radius:999px;
          color:#f3ecdd;font-family:monospace;font-size:11px;font-weight:600;
          box-shadow:0 0 10px rgba(201,162,75,0.3);">${firms.length}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const popupHtml = `
        <div style="font-family:system-ui,sans-serif;min-width:170px;">
          <div style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:6px;">${location}</div>
          ${firms
            .map(
              (f) =>
                `<a href="#" data-slug="${f.slug}" style="display:block;color:#a0782e;font-size:13px;padding:3px 0;border-bottom:1px solid #eee;text-decoration:none;">${f.firm}</a>`,
            )
            .join("")}
        </div>`;

      const marker = L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(popupHtml);

      marker.on("popupopen", (e) => {
        const node = (e as L.PopupEvent).popup.getElement();
        node?.querySelectorAll<HTMLAnchorElement>("a[data-slug]").forEach((a) => {
          a.addEventListener("click", (ev) => {
            ev.preventDefault();
            map.closePopup();
            navigate(`/research/${a.dataset.slug}`);
          });
        });
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [vcs, navigate]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-md border border-line"
      style={{ height: "480px", width: "100%" }}
      role="region"
      aria-label="Map of venture capital firm headquarters"
    />
  );
}

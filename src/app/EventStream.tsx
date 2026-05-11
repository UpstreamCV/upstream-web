"use client";

import { useEffect, useState } from "react";

interface UpstreamEvent {
  id: string;
  event: string;
  camera_id: string;
  zone_id: string;
  time: string;
}

const eventTypes = [
  { event: "person.entered_zone", zone_id: "front_door" },
  { event: "vehicle.crossed_line", zone_id: "loading_bay" },
  { event: "occupancy.threshold", zone_id: "lobby" },
  { event: "forklift.dwell", zone_id: "aisle_3" },
  { event: "person.exited_zone", zone_id: "front_door" },
  { event: "pallet.detected", zone_id: "warehouse_floor" },
  { event: "person.entered_zone", zone_id: "aisle_3" },
  { event: "vehicle.dwell", zone_id: "dock_a" },
];

const cameras = [
  "cam_dock_03",
  "cam_dock_07",
  "cam_lobby_01",
  "cam_aisle_02",
  "cam_dock_03",
];

const initialEvents: UpstreamEvent[] = [
  {
    id: "init-0",
    event: "person.entered_zone",
    camera_id: "cam_dock_03",
    zone_id: "front_door",
    time: "11:42:08",
  },
  {
    id: "init-1",
    event: "vehicle.crossed_line",
    camera_id: "cam_dock_07",
    zone_id: "loading_bay",
    time: "11:42:04",
  },
  {
    id: "init-2",
    event: "forklift.dwell",
    camera_id: "cam_aisle_02",
    zone_id: "aisle_3",
    time: "11:41:55",
  },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function nowHHMMSS() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

let counter = 0;

function makeEvent(): UpstreamEvent {
  const e = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const cam = cameras[Math.floor(Math.random() * cameras.length)];
  counter += 1;
  return {
    id: `evt-${counter}`,
    event: e.event,
    camera_id: cam,
    zone_id: e.zone_id,
    time: nowHHMMSS(),
  };
}

export default function EventStream() {
  const [events, setEvents] = useState<UpstreamEvent[]>(initialEvents);
  const [firedJustNow, setFiredJustNow] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setEvents((prev) => [makeEvent(), ...prev].slice(0, 4));
      setFiredJustNow(true);
      const t = setTimeout(() => setFiredJustNow(false), 600);
      return () => clearTimeout(t);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="event-stream">
      <div className="event-stream-head">
        <span className="title">Live events</span>
        <span className={`badge-ok ${firedJustNow ? "is-firing" : ""}`}>
          <span className="badge-dot" />
          200 OK
        </span>
      </div>
      <div className="event-stream-list">
        {events.map((e, i) => (
          <div
            key={e.id}
            className="event-row"
            style={{
              opacity: 1 - i * 0.22,
            }}
          >
            <div className="event-row-left">
              <span className="event-row-name">{e.event}</span>
              <span className="event-row-meta">
                {e.camera_id} · {e.zone_id}
              </span>
            </div>
            <span className="event-row-time">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

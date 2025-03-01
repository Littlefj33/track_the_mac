"use client";

// app/page.tsx
// import Dashboard from "./components/dashboard";
import { useEffect, useState } from "react";
import EventPointTracker from "./components/eventPointTracker";
import { getEventData } from "./utils/og_predictions_utils";

interface EventData {
	eventName: string;
	colleges: CollegeData[];
	status: string; // Add this line
}

interface CollegeData {
	team: string;
	projected: number;
	actual: number;
	difference: number;
	score: number;
}

export default function Home() {
	const [events_MEN, setEvents_MEN] = useState<EventData[]>([]);
	const [events_WOMEN, setEvents_WOMEN] = useState<EventData[]>([]);

	useEffect(() => {
		getEventData().then((data) => {
			setEvents_MEN(data.events_MEN);
			setEvents_WOMEN(data.events_WOMEN);
			console.log("Results Data:", data);
		});
	}, []);

	return (
		<main className="min-h-screen p-8 bg-white">
			{/* <Dashboard /> */}
			<EventPointTracker events_men={events_MEN} events_women={events_WOMEN} />
		</main>
	);
}

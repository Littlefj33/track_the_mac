// app/page.tsx
// import Dashboard from "./components/dashboard";
import EventPointTracker from "./components/eventPointTracker";
import { getEventData } from "./utils/og_predictions_utils";

const { events_MEN, events_WOMEN } = getEventData();

export default function Home() {
	return (
		<main className="min-h-screen p-8 bg-white">
			{/* <Dashboard /> */}
			<EventPointTracker events_men={events_MEN} events_women={events_WOMEN} />
		</main>
	);
}

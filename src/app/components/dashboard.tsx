"use client";

import { useState, useEffect } from "react";

interface EventData {
	team: string;
	projectedPoints: number;
}

interface Events {
	[key: string]: EventData[];
}

interface DataResponse {
	events: Events;
}

export default function Dashboard() {
	const [data, setData] = useState<DataResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			const res = await fetch("/api/scrape");
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const json = await res.json();
			setData(json);
			setLoading(false);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		// Refresh data every 60 seconds (adjust as needed)
		// const interval = setInterval(fetchData, 60000);
		// return () => clearInterval(interval);
	}, []);

	if (loading) {
		return <div className="text-center">Loading data...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">Error: {error}</div>;
	}

	return (
		<div className="bg-white text-black">
			<h1 className="text-4xl font-bold text-center mb-8">Live Track Meet Dashboard</h1>
			{data &&
				Object.keys(data.events).map((eventName) => (
					<div key={eventName} className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">{eventName}</h2>
						<table className="min-w-full bg-white border border-black">
							<thead>
								<tr>
									<th className="py-2 px-4 border-b">Team</th>
									<th className="py-2 px-4 border-b">Projected Points</th>
								</tr>
							</thead>
							<tbody>
								{data.events[eventName].map((item, index) => (
									<tr key={index} className="text-center">
										<td className="py-2 px-4 border-b">{item.team}</td>
										<td className="py-2 px-4 border-b">{item.projectedPoints}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				))}
		</div>
	);
}

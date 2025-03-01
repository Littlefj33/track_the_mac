// components/PredictionTable.tsx
import React from "react";

interface PredictionData {
	teamName: string;
	currentPlacePrediction: string;
	currentScorePrediction: number;
	originalPlacePrediction: string;
	originalScorePrediction: number;
}

interface PredictionTableProps {
	data: PredictionData[];
}

export const ScoreTracker: React.FC<PredictionTableProps> = ({ data }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white border border-gray-200">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">Team Name</th>
						<th className="py-2 px-4 border-b">Current Place Prediction</th>
						<th className="py-2 px-4 border-b">Current Score Prediction</th>
						<th className="py-2 px-4 border-b">Original Place Prediction</th>
						<th className="py-2 px-4 border-b">Original Score Prediction</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index} className="text-center">
							<td className="py-2 px-4 border-b">{row.teamName}</td>
							<td className="py-2 px-4 border-b">{row.currentPlacePrediction}</td>
							<td className="py-2 px-4 border-b">{row.currentScorePrediction}</td>
							<td className="py-2 px-4 border-b">{row.originalPlacePrediction}</td>
							<td className="py-2 px-4 border-b">{row.originalScorePrediction}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ScoreTracker;

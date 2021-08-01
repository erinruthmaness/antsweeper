import { useState, useEffect } from "react";

const HighScores = () => {
	const [scores, setScores] = useState({
		beginner: [],
		intermediate: [],
		advanced: [],
	});

	const scoreList = (level) => {
		return (
			<ul>
				<li>
					<h3>{`${level[0].toUpperCase()}${level.slice(1)}`}</h3>
				</li>
				{scores[level].length ? (
					scores[level].map((score) => (
						<li key={score.id}>
							{score.name}: {score.score}
						</li>
					))
				) : (
					<li>No high scores yet for this level!</li>
				)}
			</ul>
		);
	};

	useEffect(() => {
		const fetchScores = async () => {
			const res = await fetch(
				"https://fir-bee8d.firebaseio.com/antsweeper.json"
			);
			const resData = await res.json();

			const jsonScores = { beginner: [], intermediate: [], advanced: [] };
			for (const key in resData) {
				try {
					jsonScores[resData[key].level].push({
						id: key,
						name: resData[key].name,
						score: resData[key].score,
					});
				} catch (e) {
					console.log(resData[key]);
					console.log(e);
				}
			}

			const sortedScores = {};
			for (const level in jsonScores) {
				sortedScores[level] = jsonScores[level].sort(
					(a, b) => a.score > b.score
				);
			}
			setScores(sortedScores);
		};
		fetchScores();
	}, []);

	return (
		<aside>
			<h2>Best Times</h2>
			{scoreList("beginner")}
			{scoreList("intermediate")}
			{scoreList("advanced")}
		</aside>
	);
};

export default HighScores;

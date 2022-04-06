import { PieChart, Pie, Cell } from 'recharts';

const Subject = (props) => {
	const data = [
		{ title: props.name, value: props.percent, color: '#000000' },
		{ title: '', value: 100 - props.percent, color: '#ffffff' },
	];
	return (
		<div className="Subject">
			<div className="circular-progress">
				<PieChart width={100} height={100}>
					<text x={50} y={50} textAnchor="middle" dominantBaseline="middle">
						{`${props.percent} %`}
					</text>
					<Pie
						data={data}
						dataKey="value"
						innerRadius="80%"
						outerRadius="100%"
						fill="#f3f3f3"
						startAngle={90}
						endAngle={-270}
						paddingAngle={0}
					>
						<Cell key="test" fill="#006eff" />
					</Pie>
				</PieChart>
			</div>
			<div className="timing1">
				<h2>{props.name}</h2>
				<p>Due Date: Sep 7, 2021</p>
			</div>
		</div>
	);
};

export default Subject;

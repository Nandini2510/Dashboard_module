import { useEffect, useState } from 'react';
import Subject from './Subject';
import ReactApexChart from 'react-apexcharts';
import './HomeWork.css';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';
import Loader from '../Loader/Loader';
import axios from '../../axios/axios';

const HomeWork = () => {
	const series = [
		{
			data: [],
		},
	];
	const options = {
		chart: {
			type: 'bar',
			height: 350,
			toolbar: {
				show: false,
			},
		},

		plotOptions: {
			bar: {
				horizontal: true,
			},
		},
		dataLabels: {
			enabled: true,
		},
		xaxis: {
			categories: [],
		},
		grid: {
			show: false,
			xaxis: {
				lines: {
					show: false,
				},
			},
		},
		yaxis: {
			reversed: true,
			axisTicks: {
				show: false,
			},
		},
	};

	const [loading, setLoading] = useState(true);
	const [showInput, setShowInput] = useState(false);
	const [chartSeries, setChartSeries] = useState(series);
	const [chartOptions, setChartOptions] = useState(options);
	const [subject, setSubject] = useState('');
	const [progress, setProgress] = useState(0);

	const fetchHomework = async () => {
		try {
			const { data } = await axios.get('/homeworks');

			const series = data.map((data) => data.progress);
			const options = data.map((data) => data.subject);
			setChartSeries([
				{
					data: series,
				},
			]);
			setChartOptions({
				...chartOptions,
				xaxis: {
					categories: options,
				},
			});
		} catch (err) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	};

	const addHomework = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const homeworkData = {
				subject,
				progress,
			};
			await axios.post('/homeworks', homeworkData);
			fetchHomework();
			setShowInput(false);
		} catch (err) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHomework();
	}, []);

	return (
		<div className="box1">
			<div className="homework-header">
				<h2>Homework Progress</h2>
				<button onClick={() => setShowInput(!showInput)}>
					{showInput ? <IoCloseOutline /> : <IoAdd />}
				</button>
			</div>
			{showInput && (
				<div className="add-newtask">
					<form onSubmit={addHomework}>
						<input
							type="text"
							placeholder="Add Subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Add completion"
							max={100}
							value={progress}
							onChange={(e) => setProgress(e.target.value)}
						/>

						<button type="submit">Add</button>
					</form>
				</div>
			)}

			{loading ? (
				<Loader />
			) : (
				<div id="chart">
					<ReactApexChart
						options={chartOptions}
						series={chartSeries}
						type="bar"
						height={350}
					/>
				</div>
			)}
		</div>
	);
};

export default HomeWork;

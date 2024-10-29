import React, { useState, useEffect } from 'react';

const DailyTemplate = () => {	
	const [data, setData] = useState('');
	const [horarioDormiu, setHorarioDormiu] = useState('');
	const [horarioAcordou, setHorarioAcordou] = useState('');
	const [horasDormidas, setHorasDormidas] = useState('');
	const [tarefas, setTarefas] = useState([]);
	const [mood, setMood] = useState('');
	const [qualidadeSono, setQualidadeSono] = useState('');

	const handleTimeDifference = () => {
		if (horarioDormiu && horarioAcordou) {
			const [horasDormiu, minutosDormiu] = horarioDormiu.split(":").map(Number);
			const [horasAcordou, minutosAcordou] = horarioAcordou.split(":").map(Number);

			const minutosDormiuTotal = horasDormiu * 60 + minutosDormiu;
			const minutosAcordouTotal = horasAcordou * 60 + minutosAcordou;

			const diferencaEmMinutos = minutosAcordouTotal >= minutosDormiuTotal 
				? minutosAcordouTotal - minutosDormiuTotal 
				: (1440 - minutosDormiuTotal) + minutosAcordouTotal;

			const horas = Math.floor(diferencaEmMinutos / 60);
			const minutos = diferencaEmMinutos % 60;

			setHorasDormidas(`${horas}h ${minutos}min`);
		}
	};

	useEffect(() => {
		handleTimeDifference();
	}, [horarioDormiu, horarioAcordou]);

	const downloadTxtFile = () => {
		const content = `
			Data: ${data}
			Horário que dormiu: ${horarioDormiu}
			Horário que acordou: ${horarioAcordou}
			Horas dormidas: ${horasDormidas}
			Qualidade do sono: ${qualidadeSono}
			Tarefas: ${tarefas.join(', ')}
			Estou me sentindo: ${mood} 
		`;

		const element = document.createElement("a");
		const file = new Blob([content], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = `daily-routine-${data}.txt`;
		document.body.appendChild(element);
		element.click(); 
	};

	const handleClearAll = () => {
		setData('');
		setHorarioDormiu('');
		setHorarioAcordou('');
		setHorasDormidas('');
		setTarefas([]);
		setMood('');
		setQualidadeSono('');
	};

	return (
		<main className="tela-area w-screen h-screen flex justify-center items-center bg-zinc-800 text-white">
			<section className="area-utilizacao w-[500px] bg-zinc-900 flex flex-col p-7 rounded-2xl">
				<h1 className="titulo-rotina flex justify-center mb-3 font-extrabold text-2xl bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">ATUALIZAÇÃO DIÁRIA</h1>
				<div className="area-formulario">
					<div className="data-de-hoje mb-3 flex flex-col">
						<label className="label-data mx-3 mb-1">Data</label>
						<input
							type="date"
							value={data}
							onChange={(e) => setData(e.target.value)}
							className="input-data px-3 py-2 rounded-lg text-black"
						/>
					</div>
					<div className="flex flex-row justify-around items-center">
						<div className="sono-start mb-3 flex flex-col">
							<label className="label-hora-dormiu mb-1">Horário que dormiu</label>
							<input
								type="time"
								value={horarioDormiu}
								onChange={(e) => setHorarioDormiu(e.target.value)}
								className="input-hora-dormiu px-3 py-2 rounded-lg text-black"
							/>
						</div>
						<div className="sono-stop mb-3 flex flex-col">
							<label className="label-hora-acordou mb-1">Horário que acordou</label>
							<input
								type="time"
								value={horarioAcordou}
								onChange={(e) => setHorarioAcordou(e.target.value)}
								className="input-hora-acordou px-3 py-2 rounded-lg text-black"
							/>
						</div>
						{horarioDormiu && horarioAcordou && (
							<div className="sono-run mb-3 flex flex-col pt-7">
								<p className="display-horas-dormidas px-3 py-2 rounded-lg font-semibold text-white">
									{horasDormidas}
								</p>
							</div>
						)}
					</div>
					<div className="qualidade-dosono mb-3 flex flex-col">
						<label className="label-qualidade mb-1 mx-3">Qualidade do sono</label>
						<input
							value={qualidadeSono}
							onChange={(e) => setQualidadeSono(e.target.value)}
							className="input-qualidade px-3 py-2 rounded-lg text-black"
							placeholder='ex.: "sono leve", "sono pesado".'
						/>
					</div>
					<div className="area-tarefas mb-3 flex flex-col">
						<label className="label-tarefas mb-1 mx-3">Tarefas</label>
						<input
							type="text"
							placeholder="Adicionar tarefa"
							onKeyDown={(e) => {
								if (e.key === 'Enter' && e.target.value) {
									setTarefas([...tarefas, e.target.value]);
									e.target.value = '';
								}
							}}
							className="input-tarefas px-3 py-2 rounded-lg text-black"
						/>
						<ul>
							{tarefas.map((tarefa, index) => (
								<li key={index} className="linha-tarefa flex my-2 py-0.5 px-2 justify-between hover:bg-white/10 rounded items-center">
									{tarefa}
									<span class="material-symbols-outlined text-[20px] cursor-pointer hover:text-red-500" onClick={() => setTarefas(tarefas.filter((_, i) => i !== index))}>
										close
									</span>
								</li>
							))}
						</ul>
					</div>
					<div className="my-mood mb-3 flex flex-col">
						<label className="label-mood mb-1 mx-3">Como estou me sentindo</label>
						<textarea value={mood} onChange={(e) => setMood(e.target.value)} className="text-mood px-3 py-2 rounded-lg text-black"/>
					</div>
				</div>
				<div className="botoes flex justify-between mt-5">
					<button onClick={handleClearAll} className="botao-apagar-tudo text-white hover:text-red-500 px-4 py-2 rounded-lg"> Apagar tudo </button>
					<button onClick={downloadTxtFile} className="botao-salvar-em-txt bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"> Salvar atualização </button>
				</div>
			</section>
		</main>
	);
}

export default DailyTemplate;

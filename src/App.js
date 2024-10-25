import React, { useState, useEffect } from 'react';

const DailyTemplate = () => {	
	const [data, setData] = useState('');
	const [horarioDormiu, setHorarioDormiu] = useState('');
	const [horarioAcordou, setHorarioAcordou] = useState('');
	const [horasDormidas, setHorasDormidas] = useState('');
	const [tarefas, setTarefas] = useState([]);
	const [mood, setMood] = useState('');

	// Função para calcular a diferença entre os horários
	const handleTimeDifference = () => {
		if (horarioDormiu && horarioAcordou) {
			const [horasDormiu, minutosDormiu] = horarioDormiu.split(":").map(Number);
			const [horasAcordou, minutosAcordou] = horarioAcordou.split(":").map(Number);

			// Converte horas e minutos para minutos totais desde a meia-noite
			const minutosDormiuTotal = horasDormiu * 60 + minutosDormiu;
			const minutosAcordouTotal = horasAcordou * 60 + minutosAcordou;

			// Calcula a diferença em minutos, considerando se acordou no dia seguinte
			const diferencaEmMinutos = minutosAcordouTotal >= minutosDormiuTotal 
				? minutosAcordouTotal - minutosDormiuTotal 
				: (1440 - minutosDormiuTotal) + minutosAcordouTotal; // 1440 min = 24 horas

			// Converte a diferença para horas e minutos
			const horas = Math.floor(diferencaEmMinutos / 60);
			const minutos = diferencaEmMinutos % 60;

			setHorasDormidas(`${horas}h ${minutos}min`);
		}
	};

	// Recalcula horas dormidas quando os horários mudam
	useEffect(() => {
		handleTimeDifference();
	}, [horarioDormiu, horarioAcordou]);

	const downloadTxtFile = () => {
		const content = `
			Data: ${data}
			Horário que dormiu: ${horarioDormiu}
			Horário que acordou: ${horarioAcordou}
			Horas dormidas: ${horasDormidas}
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

	const handleSave = () => {
		const rotinaDiaria = { data, horarioDormiu, horarioAcordou, horasDormidas, tarefas, mood };
		localStorage.setItem('rotinaDiaria', JSON.stringify(rotinaDiaria));
		alert('Informações salvas com sucesso!');
	};

	return (
		<main className="w-screen h-screen tela-area bg-gray-400">
			<section className="area-utilizacao bg-pink-300">
				<h1 className="titulo-rotina">Rotina Diária</h1>
				<div className="area-formulario">
					<div>
						<label className="label-data">Data:</label>
						<input
							type="date"
							value={data}
							onChange={(e) => setData(e.target.value)}
							className="input-data"
						/>
					</div>
					<div>
						<label className="label-hora-dormiu">Horário que Dormiu:</label>
						<input
							type="time"
							value={horarioDormiu}
							onChange={(e) => setHorarioDormiu(e.target.value)}
							className="input-hora-dormiu"
						/>
					</div>
					<div>
						<label className="label-hora-acordou">Horário que Acordou:</label>
						<input
							type="time"
							value={horarioAcordou}
							onChange={(e) => setHorarioAcordou(e.target.value)}
							className="input-hora-acordou"
						/>
					</div>
					<div>
						<label className="label-horas-dormidas">Horas Dormidas:</label>
						<input
							type="text"
							value={horasDormidas}
							readOnly
							className="input-horas-dormidas"
						/>
					</div>
					<div>
						<label className="label-tarefas">Tarefas:</label>
						<input
							type="text"
							placeholder="Adicionar tarefa"
							onKeyDown={(e) => {
								if (e.key === 'Enter' && e.target.value) {
									setTarefas([...tarefas, e.target.value]);
									e.target.value = '';
								}
							}}
							className="input-tarefas"
						/>
						<ul>
							{tarefas.map((tarefa, index) => (
								<li key={index} className="linha-tarefa">
									{tarefa}
									<button onClick={() => setTarefas(tarefas.filter((_, i) => i !== index))} className="botao-remove-tarefa"> Remover </button>
								</li>
							))}
						</ul>
					</div>
					<div>
						<label className="label-mood">Como Estou Me Sentindo:</label>
						<textarea value={mood} onChange={(e) => setMood(e.target.value)} className="text-mood"/>
					</div>
				</div>
				<div className="botoes">
					<button onClick={downloadTxtFile} className="botao-salvar-em-txt"> Salvar rotina de hoje </button>
					<button className="botao-apagar-tudo"> Apagar tudo </button>
				</div>
			</section>
		</main>
	);
}

export default DailyTemplate;

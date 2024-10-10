import React, {useState, useEffect} from 'react';
import './App.css';

function App() {	
	const [data, setData] = useState('');
	const [horarioEntrada, setHorarioEntrada] = useState('');
	const [horasDormidas, setHorasDormidas] = useState(0);
	const [tarefas, setTarefas] = useState([]);
	const [feeling, setFeeling] = useState('');

  	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('rotinaDiaria'));
		if (savedData) {
		setData(savedData.data);
		setHorarioEntrada(savedData.horarioEntrada);
		setHorasDormidas(savedData.horasDormidas);
		setTarefas(savedData.tarefas);
		setFeeling(savedData.feeling);
		}
	}, []);

	const handleSave = () => {
		const rotinaDiaria = { data, horarioEntrada, horasDormidas, tarefas, feeling };
		localStorage.setItem('rotinaDiaria', JSON.stringify(rotinaDiaria));
		alert('Informações salvas com sucesso!');
	};

	return (
		<div className="p-4 max-w-lg mx-auto">
			<h1 className="text-2xl font-bold mb-4">Rotina Diária</h1>
			<label className="block mb-2 ml-5 font-medium">Data:</label>
			<input
				type="date"
				value={data}
				onChange={(e) => setData(e.target.value)}
				className="border px-5 py-2 w-full mb-4 rounded-3xl"
			/>
			<label className="block mb-2 ml-5 font-medium">Horário de Entrada:</label>
			<input
				type="time"
				value={horarioEntrada}
				onChange={(e) => setHorarioEntrada(e.target.value)}
					className="border px-5 py-2 w-full mb-4 rounded-3xl"
			/>
			<label className="block mb-2 ml-5 font-medium">Horas Dormidas:</label>
			<input
				type="number"
				value={horasDormidas}
				onChange={(e) => setHorasDormidas(e.target.value)}
				className="border px-5 py-2 w-full mb-4 rounded-3xl"
			/>
			<label className="block mb-2 ml-5 font-medium">Tarefas:</label>
			<input
				type="text"
				placeholder="Adicionar tarefa"
				onKeyDown={(e) => {
					if (e.key === 'Enter' && e.target.value) {
						setTarefas([...tarefas, e.target.value]);
						e.target.value = '';
					}
				}}
				className="border px-5 py-2 w-full mb-4 rounded-3xl"
			/>
			<ul>
				{tarefas.map((tarefa, index) => (
					<li key={index} className="mb-2 mx-5 flex justify-between">
						{tarefa}
						<button
							onClick={() => setTarefas(tarefas.filter((_, i) => i !== index))}
							className="text-red-500"
						>
							Remover
						</button>
					</li>
				))}
			</ul>
			<label className="block mb-2">Como Estou Me Sentindo:</label>
			<textarea
				value={feeling}
				onChange={(e) => setFeeling(e.target.value)}
				className="border p-2 w-full mb-4"
			/>
			<button
				onClick={handleSave}
				className="bg-blue-500 text-white p-2 rounded mt-4"
			>
				Salvar
			</button>
		</div>
  	);
}

export default App;

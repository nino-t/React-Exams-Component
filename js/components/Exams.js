import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Exams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 7200,
			soal: [
				{
					question_id: 23,
					question: 'Apa nama negara kita?',
					option: [
						{
							option_id: 11,
							option: 'Indonesia',
							selected: false
						},
						{
							option_id: 12,
							option: 'Amerika',
							selected: false
						},
						{
							option_id: 13,
							option: 'India',
							selected: false
						},
						{
							option_id: 14,
							option: 'China',
							selected: false
						}						
					],
					answer_key: '',
					ragu_ragu: false
				},
				{
					question_id: 22,
					question: 'Apa Warna Bendera Kita?',
					option: [
						{
							option_id: 22,
							option: 'Merah Putih',
							selected: false
						},
						{
							option_id: 21,
							option: 'Hijau Biru',
							selected: false
						},
						{
							option_id: 32,
							option: 'Pink',
							selected: false
						},
						{
							option_id: 34,
							option: 'Putih Abu',
							selected: false
						}						
					],
					answer_key: '',
					ragu_ragu: false
				},
				{
					question_id: 31,
					question: 'Kamu Tinggal Dimana?',
					option: [
						{
							option_id: 53,
							option: 'Jakarta',
							selected: false
						},
						{
							option_id: 45,
							option: 'Bali',
							selected: false
						},
						{
							option_id: 47,
							option: 'Papua',
							selected: false
						},
						{
							option_id: 67,
							option: 'Subang',
							selected: false
						}						
					],
					answer_key: '',
					ragu_ragu: false
				},				
			],
			select_soal_index: 0
		}

		this.changeSoal = this.changeSoal.bind(this);
		this.selectOption = this.selectOption.bind(this);
		this.raguraguChange = this.raguraguChange.bind(this);
		this.convertTime = this.convertTime.bind(this);		

		localStorage.sisa_waktu = this.state.time;
	}

	changeSoal(key_id){
		const soal = this.state.soal;

		this.setState({
			select_soal_index: key_id
		});
	}

	raguraguChange(key_id){
		const selected = this.state.soal;		
		if (this.state.soal[key_id].ragu_ragu == true) {
			selected[key_id].ragu_ragu = false;
		}else{
			selected[key_id].ragu_ragu = true;
		}		

		this.setState({
			selected
		});		
	}

	selectOption(soal_id, key_id){
		const x = 'A';
		const selected = this.state.soal;
		selected[soal_id].option[key_id].selected = true;
		selected[soal_id].answer_key = String.fromCharCode(x.charCodeAt(0) + key_id);

		this.setState({
			selected
		});
	}

	tick() {
		this.setState((prevState) => ({
			time: prevState.time - 1
		}));
		
		localStorage.sisa_waktu = this.state.time;
	}	

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}	

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	convertTime(time){
	    var sec_num = parseInt(time, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    return hours+':'+minutes+':'+seconds;
	}

    render() {
    	const soal = this.state.soal;
    	const select_soal_index = this.state.select_soal_index;
    	const YourAnswer = this.state.soal[select_soal_index].YourAnswer;
    	const soal_select = this.state.soal[select_soal_index];
    	const x = 'A';

        return (
            <div className="container">      
            	<div className="row">
            	  	<div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            	  		<div className="panel panel-danger">
            	  			<div className="panel-heading">
            	  				<h3 className="panel-title">SOAL</h3>
            	  			</div>
            	  			<div className="panel-body">
            	  				<div>
            	  					<h1>{select_soal_index+1}</h1>
            	  					<div>
            	  						<p>{soal_select.question}</p>
            	  						<div>
											{
											    soal_select.option.map((data, i) => (
				            	  					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" key={i}>
				            	  						<div>
				            	  							<input 
				            	  								type="radio" 
				            	  								name="option_select" 
				            	  								value={i}
				            	  								checked={data.selected}
				            	  								onChange={() => this.selectOption(select_soal_index, i)}  /> 
				            	  							 {String.fromCharCode(x.charCodeAt(0) + i)}. {data.option}
				            	  						</div>
				            	  					</div>				            	  					
											    ))				  		
											}            	  				            	  						
            	  						</div>
            	  					</div>
            	  					<br/><br/><br/>
            	  				</div>
            	  				<br/><br/><br/>
            	  				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            	  					<button 
            	  						type="button" 
            	  						className="btn btn-success pull-left" 
            	  						onClick={() => this.changeSoal(select_soal_index-1)}>
            	  						Prev
            	  					</button>
            	  				</div>            	  				
            	  				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            	  					<center>
            	  						<input 
            	  						type="checkbox" 
            	  						name="ragu-ragu" 
            	  						onChange={() => this.raguraguChange(select_soal_index)} 
            	  						checked={soal_select.ragu_ragu} />
            	  						<br />
            	  						<b>Ragu-Ragu</b>
            	  					</center>            	  					
            	  				</div>
            	  				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            	  					<button 
            	  						type="button" 
            	  						className="btn btn-primary pull-right" 
            	  						onClick={() => this.changeSoal(select_soal_index+1)}>
            	  						Next
            	  					</button>
            	  				</div>            	  				
            	  				<div className="clearfix"></div>
            	  			</div>
            	  		</div>
            	  	</div>
            	  	<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            	  		<div className="panel panel-success">
            	  			<div className="panel-heading">
            	  				<h3 className="panel-title">Waktu Tersisa</h3>
            	  			</div>
            	  			<div className="panel-body">
            	  				<h4 className="text-center">{ this.convertTime(this.state.time) }</h4>
            	  			</div>
            	  		</div>

            	  		<div className="panel panel-primary">
            	  			<div className="panel-heading">
            	  				<h3 className="panel-title">NOMER</h3>
            	  			</div>
            	  			<div className="panel-body">
            	  				<div className="row">
								{
								    soal.map((data, i ) => (
	            	  					<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" key={i}>
	            	  						<div>
	            	  							<button 
	            	  								onClick={() => this.changeSoal(i)} 
	            	  								className={"btn btn-xs " + (data.ragu_ragu ? 'btn-warning' : 'btn-primary')}>
	            	  								{i + 1} { data.answer_key }
	            	  							</button>
	            	  						</div>
	            	  					</div>
								    ))				  		
								}            	  				
            	  				</div>
            	  			</div>
            	  		</div>
            	  	</div>
            	 </div>                  
            </div>
        );
    }
}

export default Exams;

if (document.getElementById('tsu-exams')) {
    ReactDOM.render(<Exams />, document.getElementById('tsu-exams'));
}
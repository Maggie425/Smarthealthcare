
function Table(){
	const Handlesubmit=()=>
	{
		var name=document.getElementsByClassName('name');
		var email=document.getElementsByClassName('email');
		var pword=document.getElementsByClassName('pword');
		var display= document.getElementById('demo');
		if(name.length==0)
		{
			display.innerHTML+="Need name";
		}
		else if(pword.length<10)
		{
			display.innerHTML+="password should be 10 characters";
		}
const pattern = /[@]/;
		if(!pattern.test(email))
	{
		display.innerHTML+="invalid email";
	}
	else
	{
		display.innerHTML="Submit success";
	}
	}
	return(
<>
	
			<h3>Name</h3>
			<input className='name' type="text"></input>
			<h3>Email</h3>
			<input className='email' type="text"></input>
			<h3>password</h3>
			<input className='pword' type="password"></input>
			<button onClick={Handlesubmit}>Submit</button>
			<p id='demo'></p>
		
</>
);
}

export default Table;
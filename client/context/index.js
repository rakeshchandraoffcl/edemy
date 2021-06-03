import { createContext, useEffect, useReducer } from 'react';
import axios from "axios";
import {useRouter} from "next/router";


// Initial State
const initialState = {
	user: null,
};

// Create Context
const Context = createContext();

const rootReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
			};

		default:
			return state;
	}
};

const Provider = ({ children }) => {
	const {push} = useRouter();
	const [state, dispatch] = useReducer(rootReducer, initialState);
	useEffect(() => {
		dispatch({
			type: 'LOGIN',
			payload: JSON.parse(window.localStorage.getItem('user')),
		});
	}, []);

	// Add a response interceptor
	axios.interceptors.response.use(function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	}, function (error) {

		const res = error.response;
		console.log({res: error})
		if(res.status === 401){
			axios.get('/api/logout',(res) => {
				window.localStorage.removeItem('user');
				dispatch({type: 'LOGOUT'});
				push('/login').then(_ => {});
			}).catch(error => {
				console.log(error.message)
			})
		}
	});

	useEffect(()=>{
		(async() => {
			try {
				const { data } = await axios.get('/api/get-csrf-token');
				console.log(data)
				axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
			} catch (error){
				console.log("sb",error)
			}
		})()
	},[])

	return (
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export { Context, Provider };

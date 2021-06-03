import React, { useContext, useState,useEffect } from 'react';

import { Context } from '../context';
import Link from 'next/link';
import { SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const LogIn = () => {
	const router = useRouter();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const { state, dispatch } = useContext(Context);
	const { user } = state;

	const onSubmit = async (e) => {
		try {
			setLoading(true);
			e.preventDefault();
			const { data } = await axios.post(`/api/login`, form);
			toast.success('Login successfull');
			dispatch({
				type: 'LOGIN',
				payload: data,
			});
			window.localStorage.setItem('user', JSON.stringify(data));
			setLoading(false);
			await router.push('/');
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data);
		}
	};

	useEffect(()=>{
		(async() => {
			if(user !== null) await router.push('/')
		})()
	},[user])
	return (
		<div>
			<h1>Login Page</h1>
			<div className="container col-md-4 offset-md-4 pb-5">
				<form onSubmit={onSubmit}>
					<input
						type="email"
						className="form-control mb-4 "
						name="email"
						value={form.email}
						onChange={onChange}
						placeholder="Enter email"
						required
					/>
					<input
						type="password"
						className="form-control mb-4 "
						name="password"
						value={form.password}
						onChange={onChange}
						placeholder="Enter password"
						required
					/>
					<div className="d-grid gap-2">
						<button
							type="submit"
							className="btn btn-primary  p-2"
							disabled={!form.email || !form.password || loading}
						>
							{loading ? <SyncOutlined spin /> : 'Submit'}
						</button>
					</div>
				</form>
				<p className="text-center p-3">
					Not Yet Registered ?{' '}
					<Link href="/register">
						<a>Register</a>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LogIn;

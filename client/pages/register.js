import React, {useState, useContext, useEffect} from 'react';

import Link from 'next/link';
import {SyncOutlined} from '@ant-design/icons';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useRouter} from "next/router";
import {Context} from "../context";


const Register = () => {
	const router = useRouter();
	const {state: {user}, dispatch} = useContext(Context);
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: ''
	});
	const [loading, setLoading] = useState(false);

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = async (e) => {
		try {
			setLoading(true);
			e.preventDefault();
			await axios.post(`/api/register`, form);
			toast.success('Registration successfull, Please login');
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data);
		}
	};

	useEffect(() => {
		(async () => {
			if (user !== null) await router.push('/');
		})();
	}, [user]);
	return (
		<div>
			<h1>Register Page</h1>
			<div className="container col-md-4 offset-md-4 pb-5">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						className="form-control mb-4 "
						name="name"
						value={form.name}
						onChange={onChange}
						placeholder="Enter name"
						required
					/>
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
							disabled={
								!form.name ||
								!form.email ||
								!form.password ||
								loading
							}
						>
							{loading ? <SyncOutlined spin/> : 'Submit'}
						</button>
					</div>
				</form>
				<p className="text-center p-3">
					Already Registered ?{' '}
					<Link href="/login">
						<a>Login</a>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;

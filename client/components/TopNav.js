import {
	AppstoreAddOutlined,
	LoginOutlined,
	UserAddOutlined,
	LogoutOutlined
} from '@ant-design/icons';
import React, {useEffect, useState, useContext} from 'react';

import Link from 'next/link';
import {Menu} from 'antd';
import {Context} from '../context/index';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

const {Item} = Menu;

const TopNav = () => {
	const [current, setCurrent] = useState('');
	const {state, dispatch} = useContext(Context);
	const router = useRouter();
	const {user} = state;

	const logout = async () => {
		dispatch({type: 'LOGOUT'});
		window.localStorage.removeItem('user');
		const {data} = await axios.get('/api/logout');
		toast.success(data.message);
		await router.push('/login');
	};

	useEffect(() => {
		process.browser && setCurrent(window.location.pathname);
	}, [process.browser && window.location.pathname]);
	return (
		<Menu mode="horizontal" selectedKeys={[current]}>
			<Item
				icon={<AppstoreAddOutlined/>}
				key="/"
				onClick={(e) => setCurrent(e.key)}
			>
				<Link href="/">
					<a>App</a>
				</Link>
			</Item>
			{
				user === null && <>
					<Item
						icon={<LoginOutlined/>}
						key="/login"
						onClick={(e) => setCurrent(e.key)}
					>
						<Link href="/login">
							<a>LogIn</a>
						</Link>
					</Item>
					<Item
						icon={<UserAddOutlined/>}
						key="/register"
						onClick={(e) => setCurrent(e.key)}
					>
						<Link href="/register">
							<a>Register</a>
						</Link>
					</Item>
				</>
			}
			{
				user !== null && <Item
					icon={<LogoutOutlined/>}
					onClick={logout}
					className="float-right"
				>
					Logout
				</Item>
			}


		</Menu>
	);
};

export default TopNav;

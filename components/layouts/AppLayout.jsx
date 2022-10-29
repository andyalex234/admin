import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useWeb3 } from "@3rdweb/hooks";
import { DashboardOutlined, SettingOutlined, UsergroupAddOutlined, UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown, Space, Row, Button, Typography, Image } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography




const AppLayout = ({ children }) => {
    const router = useRouter();
    const { address, connectWallet, disconnectWallet } = useWeb3();
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link href='/profile'>
                            Profile
                        </Link>
                    ),
                },
                {
                    key: '4',
                    danger: true,
                    icon: <LogoutOutlined />,
                    label: (
                        <a onClick={() => disconnectWallet()}>
                            Disconnecct Wallet
                        </a>
                    ),
                },
            ]}
        />
    );
    
    const handleClick = (e, href) => {
        // e.preventDefault()
        router.push(href)
    }
    console.log(address??'address: nothing')

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            lable: 'Dashboard',
            href: '/'
        },
        {
            key: 'Employees',
            icon: <UsergroupAddOutlined />,
            lable: 'Employees',
            href: '/employees',
        },
        {
            key: 'profile',
            icon: <UserOutlined />,
            lable: 'Profile',
            href: '/profile'
        },
        {
            key: 'settings',
            icon: <SettingOutlined/>,
            lable: 'Settings',
            href: '/settings'
        }
    ];

    return (
        <Layout
            style={{ minHeight: '100vh' }}
        >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" style={{
                    display: "flex",
                    alignItems: "baseline",
                    padding: "5px",
                    marginBottom: "38px",
                    color: "white"
                }}>
                    {/* <RocketOutlined span style={{
                        fontSize: "25px"
                    }} /> */}
                    <Image
                        src='logo.png'
                        width={40}
                    />
                    <h1
                        style={{
                            color: "white",
                            fontSize: "25px",
                            paddingLeft: "5px",
                            fontWeight: "bolder",
                            letterSpacing: '3px'
                        }}
                >FBL</h1><span>Admin</span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={menuItems.map(
                        (item) => ({
                            key: item.key,
                            icon: item.icon,
                            label: item.lable,
                            onClick: (e) => handleClick(e, item.href)
                        }),
                    )}
                />
            </Sider>
            <Layout>
                <Header
                    className="site-layout-sub-header-background top-nav"
                    style={{
                        padding: 0,
                    }}
                >
                    <div
                        className='top-nav-right'
                    >
                        <Row
                            align="middle"
                            justify='space-between'
                            gutter={[16, 16]}
                        >
                            <Space direction='horizontal'>
                                {address ? (
                                    <>
                                        {/* <Avatar
                                            size={45}
                                            src={<Image src={session.user.image}/>}
                                        /> */}
                                        <Dropdown overlay={menu}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <Text
                                                       style={{maxWidth: '100px'}}
                                                        ellipsis={{
                                                            rows: 1, 
                                                            expandable: true,
                                                            suffix: address.slice(-4) 
                                                        }}
                                                        title={`${address}--${address.slice(-3)}`}
                                                    >
                                                        {address}
                                                    </Text>
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </>

                                ) : (
                                    <>
                                        <Text type='secondary'>Please connect your wallet</Text>
                                        <Button onClick={() => connectWallet("injected")}>Connect Wallet</Button>
                                    </>
                                )}
                            </Space>
                        </Row>
                    </div>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 700,
                        }}
                    >
                        {address && children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Fund by location dapp admin ©2022
                </Footer>
            </Layout>
        </Layout>
    );
}
export default AppLayout;
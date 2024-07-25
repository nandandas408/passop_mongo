import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);
    const passwordRef = useRef()

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()

        setpasswordArray(passwords)
        console.log(passwords)

    }


    useEffect(() => {

        getPasswords()



    }, []);




    const ref = useRef()
    const showPassword = (e) => {

        if (ref.current.src.includes("/eye.png")) {

            ref.current.src = "/hidden.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/eye.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        setform({ site: "", username: "", password: "" })

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            toast('Password Saved', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
          
        }
        else {
            toast('Password Not Saved!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
    }
    const deletePassword =async (id) => {
        // setPasswordArray(passwordArray.filter(item => item.id !== id))
 
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        toast('Password Deleted', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
    

    }
    // const editPassword = (id) => {

    //     setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    //     setPasswordArray(passwordArray.filter(item => item.id !== id))


    // }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copytext = (text) => {
        toast('Copied To Clipboard', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }


    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />

            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>


                <div className="mb-5 p-2 md:p-0 md:mx-auto md:max-w-7xl md:px-40 md:py-16  ">
                    <div className="logo font-bold text-4xl text-center">
                        <span className='text-green-700 '>&lt;</span>
                        Pass
                        <span className='text-green-700 '>OP/&gt;</span>
                    </div>
                    <p className='text-green-900 text-lg text-center font-semibold '>Your Own Password Manager</p>
                    <div className="text text-white flex flex-col p-4 gap-5 items-center">

                        <input name="site" value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-4 py-1 text-black' type="text" />
                        <div className='flex flex-col md:flex-row w-full gap-8 justify-between'>
                            <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1 text-black' type="text" />
                            <div className="relative">
                                <input ref={passwordRef} name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1 text-black' type="password" />
                                <span className='absolute right-1 cursor-pointer'><img ref={ref} className='w-5 py-[7px]' src="/hidden.png" alt="" onClick={showPassword} /></span>
                            </div>

                        </div>
                        <div >
                            <button onClick={savePassword} className="flex text-black font-semibold items-center gap-1 bg-green-500 hover:bg-green-300 rounded-full px-7 py-2 w-fit border border-green-900">
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover"
                                >
                                </lord-icon>
                                Save Password</button>
                        </div>
                    </div>
                    <div className="passwords">
                        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length == 0 && <div>No passwords to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-900 text-white'>
                                <tr>
                                    <th className=''>Site </th>
                                    <th className=''>Username</th>
                                    <th className=''>Password</th>
                                    <th className=''>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map(item => {
                                    return <tr key={item.key}>
                                        <td className='text-center py-2 border border-white '><div className='flex items-center justify-center gap-1'><a href={item.site}>{item.site}</a>
                                            <div className="cursor-pointer pt-1" onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ width: 20, height: 20 }}
                                                >
                                                </lord-icon></div></div></td>
                                        <td className='text-center py-2 border border-white '>
                                            <div className='flex items-center justify-center gap-1'>
                                                <a href={item.username}>{item.username}</a>
                                                <div className="cursor-pointer pt-1" onClick={() => { copytext(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ width: 20, height: 20 }}
                                                    >
                                                    </lord-icon></div></div>
                                        </td>
                                        <td className='text-center py-2 border border-white '>
                                            <div className='flex items-center justify-center gap-1'>
                                                <a href={item.password}> {item.password} </a>
                                                <div className="cursor-pointer pt-1" onClick={() => { copytext(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ width: 20, height: 20 }}
                                                    >
                                                    </lord-icon></div></div>
                                        </td>
                                        <td >
                                            <div onClick={() => { editPassword(item.id) }} className='flex items-center justify-center gap-4 ' >
                                                <div className='cursor-pointer'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wuvorxbv.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#000000"
                                                        style={{ width: 20, height: 20 }}>
                                                    </lord-icon>
                                                </div>
                                                <div onClick={() => { deletePassword(item.id) }} className='cursor-pointer'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: 20, height: 20 }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager

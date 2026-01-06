'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('../components/Viewer'), { ssr: false });

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-[#050505] text-white selection:bg-blue-500/30">
            {/* Header */}
            <header className="h-16 px-6 flex justify-between items-center border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center font-bold text-white border border-white/10">B</div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400">
                        Blockchain CAD/BIM
                    </h1>
                </div>
                <div className="flex gap-4 items-center">
                    <ConnectButton />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
                {/* Sidebar (BIM Data) */}
                <aside className="w-full lg:w-80 border-r border-white/5 bg-black/20 backdrop-blur-sm p-5 overflow-y-auto flex flex-col gap-8">
                    <div>
                        <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-[0.2em]">Project Explorer</h2>

                        <div className="space-y-2">
                            <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer border border-white/5 hover:border-blue-500/50 transition-all duration-300 group">
                                <div className="font-medium text-blue-400 group-hover:text-blue-300 transition-colors">Cube_A.gltf</div>
                                <div className="text-[10px] text-gray-500 mt-1">Last modified: Just now</div>
                                <div className="mt-3 flex gap-2">
                                    <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded-md border border-green-500/20">Verified</span>
                                    <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded-md border border-purple-500/20">ERC-721</span>
                                </div>
                            </div>

                            <div className="p-3 bg-transparent rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all duration-300">
                                <div className="font-medium text-gray-400">Structure_Level_1.ifc</div>
                                <div className="text-[10px] text-gray-600 mt-1">Status: Pending Verification</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-[0.2em]">Asset Metadata</h2>
                        <div className="text-xs text-gray-400 space-y-2 bg-black/40 p-4 rounded-xl border border-white/5 font-mono shadow-inner">
                            <div className="flex justify-between"><span className="text-gray-600">Hash:</span> <span>0x7f...3a2b</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Owner:</span> <span>0x12...90AB</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Size:</span> <span>2.4 MB</span></div>
                        </div>
                        <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 border border-white/10">
                            Register New Asset
                        </button>
                    </div>
                </aside>

                {/* Viewer Area */}
                <section className="flex-1 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black p-6 flex flex-col gap-4">
                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-black/40">
                        <Viewer />
                    </div>

                    <div className="h-6 flex items-center gap-6 text-[10px] text-gray-600 font-mono tracking-wide uppercase">
                        <div><span className="text-blue-500">X:</span> 0.00</div>
                        <div><span className="text-green-500">Y:</span> 0.00</div>
                        <div><span className="text-red-500">Z:</span> 0.00</div>
                        <div className="ml-auto flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            Connected to Localhost
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

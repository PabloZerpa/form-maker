
"use client";
import { ReactNode, useEffect, useState } from "react";
import { Loading } from "react-daisyui";
import { FaEye, FaWpforms, FaMousePointer } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export function StatsCards() {
    const [stats, setStats] = useState<Stat>();
    const [loading, setLoading] = useState(true);

    async function getStats(){
      try {
        const res = await fetch('/api/forms/stats', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const response = await res.json();
        setStats(response);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getStats();
    }, [])

    return (
  
      <div className="w-full pt-8 flex flex-wrap justify-center gap-12">
        <StatsCard
          title="Total visits"
          icon={<FaEye className="text-blue-600 w-24" />}
          helperText="All time form visits"
          value={stats?.visits.toLocaleString() || ""}
          loading={loading}
          className="shadow-md shadow-blue-600"
        />
  
        <StatsCard
          title="Total submissions"
          icon={<FaWpforms className="text-yellow-600 w-24" />}
          helperText="All time form submissions"
          value={stats?.submissions.toLocaleString() || ""}
          loading={loading}
          className="shadow-md shadow-yellow-600"
        />
  
        <StatsCard
          title="Submission rate"
          icon={<FaMousePointer className="text-green-600 w-24" />}
          helperText="Visits that result in form submission"
          value={stats?.submissionRate.toLocaleString() + "%" || ""}
          loading={loading}
          className="shadow-md shadow-green-600"
        />
  
        <StatsCard
          title="Bounce rate"
          icon={<FaArrowTrendUp className="text-red-600 w-24" />}
          helperText="Visits that leaves without interacting"
          value={stats?.submissionRate.toLocaleString() + "%" || ""}
          loading={loading}
          className="shadow-md shadow-red-600"
        />
      </div>
    );
  }
  
function StatsCard({ title, value, icon, helperText, loading, className }: {
    title: string; value: string; helperText: string; 
    className: string; loading: boolean; icon: ReactNode;
  }) {
    return (
      <div className="card w-72 bg-base-300 shadow-xl">
        <div className="card-body">
          
          <h2 className="card-title h-16">
            {title}
            {icon}
          </h2>
  
          <p>{helperText}</p>
  
          <div className="card-actions justify-center items-center">
            {loading && ( <Loading variant="dots" size="lg" className="text-blue-600" /> )}
            {!loading && value}
          </div>
  
        </div>
      </div>
    );
}
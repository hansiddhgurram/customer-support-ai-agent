import {

    useEffect,

    useState

} from "react";

import {

    TrendingUp

} from "lucide-react";

import {

    fetchTrends

} from "../services/api";


export default function TrendInsights() {

    const [trends, setTrends] = useState([]);


    useEffect(() => {

        const loadTrends = async () => {

            try {

                const data = await fetchTrends();

                setTrends(data?.trends || []);

            } catch (error) {

                console.error(error);

                setTrends([]);

            }
        };

        loadTrends();

    }, []);


    return (

        <div className="bg-[#0F172A] border border-cyan-500/10 rounded-2xl p-6 mt-8">

            <div className="flex items-center gap-3 mb-6">

                <TrendingUp
                    className="text-cyan-400"
                    size={24}
                />

                <h2 className="text-white text-2xl font-bold">

                    Trend Insights

                </h2>

            </div>

            <div className="space-y-4">

                {

                    trends.map(

                        (trend, index) => (

                            <div

                                key={index}

                                className="bg-[#111827] rounded-xl p-4 text-gray-300"
                            >

                                {trend}

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}
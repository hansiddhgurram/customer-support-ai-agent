import {

    useEffect,

    useState

} from "react";

import {

    FileText

} from "lucide-react";

import {

    fetchExecutiveSummary

} from "../services/api";


export default function ExecutiveSummaryPanel() {

    const [summary, setSummary] = useState("");


    useEffect(() => {

        const loadSummary = async () => {

            try {

                const data = await fetchExecutiveSummary();

                setSummary(data.summary);

            }

            catch (err) {

                console.error(err);
            }
        };

        loadSummary();

    }, []);


    return (

        <div className="bg-[#0F172A] border border-cyan-500/10 rounded-2xl p-6 mt-8">

            <div className="flex items-center gap-3 mb-6">

                <FileText
                    size={24}
                    className="text-cyan-400"
                />

                <h2 className="text-white text-2xl font-bold">

                    Executive AI Summary

                </h2>

            </div>

            <div className="text-gray-300 whitespace-pre-wrap leading-7">

                {summary || "Generating summary..."}

            </div>

        </div>
    );
}
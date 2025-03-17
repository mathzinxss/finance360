"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

interface DoughnutChartProps {
  accounts: any[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({}: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Bancos",
        data: [1250, 2500, 3750],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Banco 1", "Banco 2", "Banco 3"],
  }

  return (
    <div className="p-2 w-full">
      <Doughnut
        data={data}
        options={{
          cutout: "60%",
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  )
}

export default DoughnutChart


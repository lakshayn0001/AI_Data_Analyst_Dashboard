import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const ChartView = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null

  const keys = Object.keys(data[0])

  // pick first column as label, second as value
  const labels = data.map(item => item[keys[0]])
  const values = data.map(item => item[keys[1]])

  const chartData = {
    labels,
    datasets: [
      {
        label: keys[1],
        data: values
      }
    ]
  }

  return (
    <div className="mt-4 bg-white p-3 rounded-lg">
      <Bar data={chartData} />
    </div>
  )
}

export default ChartView
import { useEffect, useState } from 'react'
import { get } from '../axios_utils';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Loader from '../loader/Loader';

function Home() {
  const [data_user, setData_user] = useState([]);
  const [inputYear, setInputYear] = useState(2024); 
  const [loader,setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const [user_count] = await Promise.all([
          get(`https://repr-izy-production.up.railway.app/api/v1/stats/user?year=${inputYear}`),
        ]);
        setData_user(user_count.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoader(false)
    };
    fetchData();
  }, [inputYear]); 

  const data = data_user[0] || [];
  console.log(data)

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h1>Tableau de bord</h1>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Produits</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>300</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Categories</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Clients</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>33</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Annonces</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>42</h1>
        </div>
      </div>
      <div className="input-home">
        <br />
        <h3>
          <span>
            Choisissez une année <hr />
          </span>
          <input
            type="number"
            min="2020"
            max="2999"
            step="1"
            placeholder="Année"
            value={inputYear}
            onChange={(e) => setInputYear(parseInt(e.target.value, 10))}
          />
          {loader && <Loader/>}
        </h3>
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            className="chart"
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthName"  angle={-30} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="userCount" name="User Count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}

export default Home
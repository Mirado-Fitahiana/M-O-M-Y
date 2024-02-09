import { useEffect, useState } from 'react'
import { get } from '../axios_utils';
import { BsPeopleFill, BsFillBellFill, BsCurrencyDollar, BsSignNoParking, BsSignDoNotEnter } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Loader from '../loader/Loader';
import MyUrl from '../MyUrl';

function Home() {
  const [data_user, setData_user] = useState([]);
  const [data_app,setData_app] = useState([]);
  const [inputYear, setInputYear] = useState(2024); 
  const [loader,setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const [user_count,data_temp] = await Promise.all([
          get(`${MyUrl}stats/user?year=${inputYear}`),
          get(MyUrl+'stats/dashboard'),
        ]);
        setData_user(user_count.data.data);
        setData_app(data_temp.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoader(false)
    };
    fetchData();
  }, [inputYear]); 

  const data = data_user[0] || [];
  const appData = data_app[0] || {};
  console.log(data)

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h1>Tableau de bord</h1>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Chiffre</h3>
            <BsCurrencyDollar className='card_icon' />
          </div>
          <h1> {appData.chiffre} AR</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Annonces non valides</h3>
            <BsSignDoNotEnter className='card_icon' />
          </div>
          <h1> {appData.nonvalide}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Ventes</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1> {appData.vente}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Clients</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1> {appData.client}</h1>
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
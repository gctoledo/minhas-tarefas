import AddButton from '../../components/AddButton'
import AsideBar from '../../containers/AsideBar'
import Tasks from '../../containers/Tasks'

const Home = () => {
  return (
    <>
      <AsideBar showFilter />
      <Tasks />
      <AddButton />
    </>
  )
}

export default Home

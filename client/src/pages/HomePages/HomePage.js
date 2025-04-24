import { HeaderHome } from "../../components/HomeComponents/LayoutComponents/HeaderHome";
import { SideMenu } from "../../components/HomeComponents/LayoutComponents/SideMenu";
import { ComponentContext } from "../../utils/contexto/GeneralContext/ComponentContext";
import { useContext, useEffect } from "react";
import { ContentHome } from '../../components/HomeComponents/MainContent/ContentHome';
import { Explore } from '../../components/HomeComponents/MainContent/Explore';
import { Trends } from '../../components/HomeComponents/MainContent/Trends';
import { Library } from '../../components/HomeComponents/MainContent/Library';
import { UserData } from '../../components/HomeComponents/MainContent/UserData';
import { Search } from "../../components/HomeComponents/LayoutComponents/Search";
import { PlayerComponent } from "../../components/HomeComponents/LayoutComponents/PlayerComponent";
import { ToastContainer } from "react-toastify";
import '../../styles/home/Layout.css';

export const HomePage = () => {
    const { component, toggleComponent } = useContext(ComponentContext);

    useEffect(() => {
        toggleComponent(2);
    }, []);

    const statusView = {
        2: <ContentHome />,
        3: <Explore />,
        4: <Trends />,
        5: <Library />,
        6: <UserData />,
        7: <Search />,
    }

    return (
        <div className="HomePage__Container">
            <div className="HomePage_Header">
                <HeaderHome />
            </div>

            <div className="HomePage__Main">
                <div className="HomePage__SideMenu">
                    <SideMenu />
                </div>

                <div className="HomePage__Content">
                    {statusView[component]}
                </div>
            </div>

            <div className="HomePage__Iframe">
                <PlayerComponent />
            </div>

            <ToastContainer />
        </div>
    )
}
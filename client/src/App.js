import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';

import FileUpload from './components/FileUpload';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <div className="App">
                    <Header />
                    <MainPages />
                </div>
            </Router>
        </DataProvider>
    )

    /**
     * File upload
     */
    // return (
    //     <div className="container">
    //         <h4 className="display-4 text-center mb-4">
    //             <i className="fab fa-react"></i> React File Upload
    //         </h4>
    //         <FileUpload />
    //     </div>
    // );
}

export default App;

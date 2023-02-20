import Header from '../component/Header';

export default function MainLayout({ children }) {
    return (
        <div className="container">
            <Header />
            {children}
        </div>
    );
}

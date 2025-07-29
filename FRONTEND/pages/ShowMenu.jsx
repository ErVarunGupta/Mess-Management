import { useEffect, useState } from "react";
import { handleError } from "../components/Layout/utils";

export const ShowMenu = () => {
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                handleError('You are not logged in.');
                return;
            }

            try {
                const url = 'http://localhost:8080/root/menu/view';
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });

                const data = await response.json();
                const { message, success } = data;

                if (success) {
                    setMenu(data.menu || {});
                } else {
                    handleError(message);
                }
            } catch (error) {
                handleError('Something went wrong!');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) {
        return <p>Loading menu...</p>;
    }

    return (
        <section className="menu-section">
            <div className="menu-container">
                <table border="" className="menu-table">
                    <thead>
                        <tr>
                            <th colSpan={4}>Weekly Menu</th>
                        </tr>
                        <tr>
                            <th>Day</th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                            <tr key={day}>
                                <td>{day}</td>
                                <td>{menu?.[day]?.breakfast || "—"}</td>
                                <td>{menu?.[day]?.lunch || "—"}</td>
                                <td>{menu?.[day]?.dinner || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

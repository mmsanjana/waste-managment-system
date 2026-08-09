import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRequest() {
    const [wasteTypes, setWasteTypes] = useState([]);
    const [selectedWaste, setSelectedWaste] = useState('');
    const [weight, setWeight] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    // පිටුව load වෙද්දීම Database එකේ තියෙන කුණු වර්ග ටික අරගෙන එනවා
    useEffect(() => {
        const fetchWasteTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/waste-types');
                setWasteTypes(response.data);
                // මුලින්ම තියෙන කුණු වර්ගය තෝරලා තියන්න
                if(response.data.length > 0) {
                    setSelectedWaste(response.data[0].waste_type_id);
                }
            } catch (error) {
                console.log("Waste types ගන්න බැහැ", error);
            }
        };
        fetchWasteTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Login වෙද්දී අපි මතක තියාගත්ත User ID එක ගන්නවා
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert("කරුණාකර නැවත Login වෙන්න!");
            navigate('/');
            return;
        }

        try {
            // සංජනාගේ backend API එකට දත්ත යවනවා
            const response = await axios.post('http://localhost:5000/pickup-requests', {
                user_id: userId,
                waste_type_id: selectedWaste,
                estimated_weight: weight,
                pickup_address: address,
                preferred_date: date
            });
            
            alert(response.data); // සාර්ථකයි කියලා message එක එයි
            navigate('/dashboard'); // ආයෙත් Dashboard එකට යනවා
            
        } catch (error) {
            alert("System Error එකක් ආවා!");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto' }}>
            <div className="glass-container">
                <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: '400' }}>Schedule a Pickup</h2>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Waste Type</label>
                        <select 
                            className="input-field" 
                            value={selectedWaste} 
                            onChange={(e) => setSelectedWaste(e.target.value)}
                            required
                            style={{ appearance: 'auto' }} // Dropdown arrow එක පේන්න
                        >
                            {wasteTypes.map((type) => (
                                <option key={type.waste_type_id} value={type.waste_type_id} style={{ color: 'black' }}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Estimated Weight (kg)</label>
                        <input 
                            type="number" 
                            className="input-field"
                            value={weight} 
                            onChange={(e) => setWeight(e.target.value)} 
                            required 
                            min="1"
                            placeholder="e.g. 5"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Pickup Address</label>
                        <input 
                            type="text" 
                            className="input-field"
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            required 
                            placeholder="Enter full address"
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Preferred Date</label>
                        <input 
                            type="date" 
                            className="input-field"
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button type="submit" className="btn-primary">Submit Request</button>
                        <button type="button" className="btn-outline" onClick={() => navigate('/dashboard')} style={{ width: '100%' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateRequest;
function SchoolIdInput() {
 
    return (
        <div>
        <label>School: </label>
        <input 
            // value={formData.date}
            // onChange={handleChange}                                
            type="text" 
            name="school_id" 
            placeholder='Ex: school..'
        />
        </div>
    )
}

export default SchoolIdInput
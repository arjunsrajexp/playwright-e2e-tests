export default class TestData{
    /**
     * Test data combinations
     *
     * 1. Dropdown
     *    - Tokyo CURA Healthcare Center
     *    - Hongkong CURA Healthcare Center
     *    - Seoul CURA Healthcare Center
     *
     * 2. Healthcare Program
     *    - Medicare
     *    - Medicaid
     *    - None
     *
     * 3. Different date
     *    - 05/10/2025
     *    - 05/11/2025
     *    - 05/12/2025
     */
    static makeAppointmentTestData(){
        return[
            {testID:"TC001",facility:"Tokyo CURA Healthcare Center",hcp:"Medicare",visitDate:"05/10/2026"},
            {testID:"TC002",facility:"Hongkong CURA Healthcare Center",hcp:"Medicaid",visitDate:"05/11/2026"},
            {testID:"TC003",facility:"Seoul CURA Healthcare Center",hcp:"None",visitDate:"05/11/2026"},
        ]
    }
}
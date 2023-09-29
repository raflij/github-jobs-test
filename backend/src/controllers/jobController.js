const axios = require('axios');

class JobController {
    async jobList(req, res) {
        try {
            const baseUrl = 'https://dev6.dansmultipro.com/api/recruitment/positions.json';
            const page = req.query.page || null;
            const description = req.query.description || null;
            const location = req.query.location || null;
            const fullTime = req.query.full_time === 'true' ? 'true' : null;
        
            const queryParams = [];
            if (description) queryParams.push(`description=${description}`);
            if (location) queryParams.push(`location=${location}`);
            if (fullTime) queryParams.push(`full_time=${fullTime}`);
        
            let apiUrl = `${baseUrl}`;
            if (queryParams.length > 0) {
              apiUrl += `?${queryParams.join('&')}`;
            }
            if (page) {
              apiUrl += `${queryParams.length > 0 ? '&' : '?'}page=${page}`;
            }
        
            const response = await axios.get(apiUrl);
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async jobDetail(req, res) {
        try {
            const jobId = req.params.id;
            const apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions/${jobId}`;

            const response = await axios.get(apiUrl);

            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new JobController();
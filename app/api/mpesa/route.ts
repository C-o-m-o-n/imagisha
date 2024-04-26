import axios from 'axios';

export  async function POST(request: Request) {
  const res = await request.json()
console.log("RES :: ", res)

  let token

  const auth = new Buffer(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
   token  = response.data.access_token
    // return Response.json({ token: response.data.access_token });

  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  // Set up your payment request parameters here
  const paymentData = {
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNDI3MDE1MTEx",
    "Timestamp": "20240427015111",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": res.amount,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": res.phone,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": res.businessName,
    "TransactionDesc": res.transactionDesc
  };

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', paymentData, { headers });
    console.log("response after payment", response)
    return Response.json(response.data);
  } catch (error: any) {
    res?.status(error.response?.status || 500).json(error.response?.data || {});
  }
}
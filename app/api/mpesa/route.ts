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
  
  const processrequestUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const Timestamp = new Date().toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\..*Z/, '000Z');
  const BusinessShortCode = '174379';
  const Password = Buffer.from(BusinessShortCode + passkey + Timestamp).toString('base64');

  // Set up your payment request parameters here
  const paymentData = {
    "BusinessShortCode": BusinessShortCode,
    "Password": Password,
    "Timestamp": Timestamp,
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": res.phone,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "Comon Tech",
    "TransactionDesc": "Trying out stkpush"
  };

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', paymentData, { headers });
    console.log("response after payment", response)
    return Response.json(response.data);
  } catch (error: any) {
    res?.status(error.response?.status || 500).json(error.response?.data || {});
  }
}
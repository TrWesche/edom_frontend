1. Retrieve List of Equipment in the Room
2. For each piece of equipment:
    - Read Telemetry Information
        - If "Wake" channel exists ping device and wait for response ("Wake" channel should have a configured timeout, if not configured wait 60seconds)
        - If no "Wake" channel is configured assume equipment always on and ready for connection
        - If "WebRTC" channel exists, check for connection status = connecting, if connecting status = true move forward to establish a live WebRTC connection.
    - Render card with equipment status (wake up request -> connecting --- connected, connection failed, connection refused)
3. For WebRTC conenctions:
    - Locate WebRTC configuration information in telemetry config 
    - Send WebRTC connection request to target via STUN server (initial supported connection type)




- Connection Types:
    - Live Simplex (One Way Data Stream - Ex. Camera with no controls) - WebRTC (Video/Audio Connection, no Signaling Channel)
    - Live Duplex (Two Way Data Stream - Ex. Robot with controls) - WebRTC (Video/Audio Connection with Signaling Channel)
    - High Volume Telemetry (Kafka)
    - Low Volume Telemetry (MQTT)
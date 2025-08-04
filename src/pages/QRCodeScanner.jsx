import { useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

function QRCodeScanner({ onScanSuccess }) {
  useEffect(() => {
  const html5QrCode = new Html5Qrcode("reader")
  let isMounted = true

  Html5Qrcode.getCameras().then(devices => {
    if (!isMounted) return

    if (devices && devices.length) {
      const cameraId = devices[0].id

      html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          console.log("QR Code escaneado:", decodedText)
          html5QrCode.stop()
          alert("QR Code lido: " + decodedText)
          // onScanSuccess?.(decodedText) <- chame aqui se for usar
        },
        (errorMessage) => {}
      ).catch(err => {
        console.error("Erro ao iniciar leitura:", err)
      })
    }
  }).catch(err => {
    console.error("Erro ao acessar câmera:", err)
  })

  return () => {
    isMounted = false
    html5QrCode.stop().catch(() => {})
  }
}, [])


  return (
    <div>
      <h2>Escaneie o QR Code</h2>
      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          border: "2px solid #ccc",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  )
}

export default QRCodeScanner

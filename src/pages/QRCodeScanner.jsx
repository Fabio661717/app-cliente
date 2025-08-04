import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function QRCodeScanner({ onScanSuccess }) {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length === 0) {
          console.warn("Nenhuma câmera encontrada.");
          return;
        }

        const cameraId = devices[0].id;

        html5QrCode
          .start(
            cameraId,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
              if (!isScanning) return;

              setIsScanning(false); // evitar múltiplas leituras
              alert("QR Code lido: " + decodedText);
              if (onScanSuccess) onScanSuccess(decodedText);

              html5QrCode
                .stop()
                .then(() => console.log("Scanner parado."))
                .catch((err) => console.error("Erro ao parar scanner:", err));
            },
            (err) => {
              // Erros de leitura são normais
              console.warn("Erro de leitura:", err);
            }
          )
          .then(() => {
            setIsScanning(true);
          })
          .catch((err) => {
            console.error("Erro ao iniciar scanner:", err);
          });
      })
      .catch((err) => {
        console.error("Erro ao acessar câmera:", err);
      });

    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current
          .stop()
          .then(() => console.log("Scanner parado ao desmontar."))
          .catch((err) => console.warn("Erro ao parar scanner ao desmontar:", err));
      }
    };
  }, [onScanSuccess, isScanning]);

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
  );
}

export default QRCodeScanner;

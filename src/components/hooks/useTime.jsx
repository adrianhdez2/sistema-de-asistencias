export const useTime = () => {
    const d = new Date()

    const hora = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    const minutos = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const segundos = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    return { time: `${hora}:${minutos}:${segundos}` }
}
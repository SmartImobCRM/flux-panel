export function getSigla(name: string) {
    const words = name.split(' ');
    const sigla = words.map(word => word[0]).join('');
    return sigla;
}
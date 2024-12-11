import { create } from "zustand";
interface IGenre {
    genre: string;
    setgenre: (genre: string) => void;
}
const useGenreState = create<IGenre>((set) => ({
    genre: "movie",
    setgenre: (genre: string) => set({ genre }),
}));

export default useGenreState
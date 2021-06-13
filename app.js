const Notes = {
    data() {
        return {
            notes: [],
            input: {
                value: '',
            },
            changing: null,
        }
    },
    mounted() {
        this.getNotes();
    },
    methods: {
        onSubmit() {
            if(!this.notes.includes(this.input.value, 0))
                this.notes.push(this.input.value);
        },
        onSubmitChangeNote(note, index) {
            this.notes[index] = note;
            this.changing = null;
        },
        removeNote(index) {
            this.notes.splice(index, 1)
        },
        changeNote(index) {
            this.changing = index;
        },
        getNotes() {
            const localNotes = localStorage.getItem('notes')
            if(localNotes)
                this.notes = JSON.parse(localNotes);
        }
    },
    watch: {
        notes: {
            handler(updatedList) {
                localStorage.setItem("notes", JSON.stringify(updatedList));
            },
            deep: true
        }
    }
}
Vue.createApp(Notes).mount('#notes');
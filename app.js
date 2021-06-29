const Notes = {
    data() {
        return {
            notes: [],
            input: {
                value: '',
            },
            changing: -1,
            error: ''
        }
    },
    mounted() {
        this.getNotes();
    },
    methods: {
        onSubmit() {
            if(this.isValid(this.input.value)) {
                this.hideError()
                this.notes.push(this.input.value.trim());
            }
        },
        onChange(value, index) {
            if(this.isValid(value)) {
                this.hideError();
                this.notes[index] = value.trim();
                this.changing = -1;
            }
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
        },
        isValid(value) {
            value = value.trim();
            if( value == '' ||
                value.length >= 256 ||
                this.notes.includes(value, 0))
            {
                this.showError(value)
                return false;
            } else {
                return true;
            }
        },
        showError(value) {
            this.error = `The value "${value}" is not correct!`
        },
        hideError() {
            this.error = ''
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
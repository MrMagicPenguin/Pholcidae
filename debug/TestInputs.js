import prompt from 'prompt'
import sha1 from 'js-sha1'

export function hashCLIInput() {
    prompt.start()

    prompt.get('in', (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log(res.in)
        console.log(sha1(res.in))
        return sha1(res.in)
    })
}
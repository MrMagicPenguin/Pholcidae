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

export function parseUserInput(){
    prompt.start()

    return prompt.get('filename', (err, res) => {
        return res.filename
    })
}

export function printSpread(...spread){
    console.log(spread.slice(0, -1))

}
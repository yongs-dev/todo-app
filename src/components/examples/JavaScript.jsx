const person = {
    name: 'Ethan',
    age: 30,
    profiles: ['twitter', 'linkedin', 'instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)
        )
        console.log(person.profiles)
    }
}

export default function JavaScript() {
    return (
        <>
            <div>{person.name}</div>
            <div>{person.age}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.printProfile()}</div>
        </>
    )
}
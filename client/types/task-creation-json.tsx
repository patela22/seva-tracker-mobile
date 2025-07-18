export const TaskCreationJson = {
  types: [
    {
      Header: 'Daily Meditation',
      Body: [
        {
          'Meditation Type':
            'RadioGroup: Mindfulness Transcendental Loving-kindness'
        },
        { 'Duration (minutes)': 'TextInputLine' },
        { 'Mantra/Focus': 'TextInputLine' },
        { Location: 'TextInputLine' },
        { Notes: 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Prayer & Chanting',
      Body: [
        { 'Prayer Type': 'RadioGroup: Japa Bhajan Mantra' },
        { Duration: 'TextInputLine' },
        { 'Specific Prayers/Mantras': 'TextInputLine' },
        { 'Number of Rounds/Repetitions': 'TextInputLine' },
        { Notes: 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Charitable Giving',
      Body: [
        { 'Type of Donation': 'RadioGroup: Money Food Clothing' },
        { 'Recipient Organization': 'TextInputLine' },
        { 'Amount/Quantity': 'TextInputLine' },
        { Purpose: 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Community Service',
      Body: [
        { 'Service Location': 'TextInputLine' },
        { 'Type of Service': 'TextInputLine' },
        { Duration: 'TextInputLine' },
        { 'People Served': 'TextInputLine' },
        { Description: 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Scripture Study',
      Body: [
        { 'Text/Scripture': 'TextInputLine' },
        { 'Chapter/Verse': 'TextInputLine' },
        { 'Study Method': 'RadioGroup: Reading Listening Discussion' },
        { Duration: 'TextInputLine' },
        { 'Key Insights': 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Temple Visit',
      Body: [
        { 'Temple Name': 'TextInputLine' },
        { Address: '' },
        { 'Activities Participated': 'TextInputLine' },
        { 'Duration of Visit': 'TextInputLine' },
        { 'Spiritual Experience': 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Seva Activities',
      Body: [
        { 'Type of Seva': 'TextInputLine' },
        { Location: 'TextInputLine' },
        { Duration: 'TextInputLine' },
        { 'People Helped': 'TextInputLine' },
        { Description: 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Fasting',
      Body: [
        { 'Type of Fast': 'RadioGroup: Water Fruit Ekadashi' },
        { Duration: 'TextInputLine' },
        { 'Spiritual Intention': 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Kirtan & Devotional Music',
      Body: [
        { 'Type of Kirtan': 'RadioGroup: Group Solo Instrumental' },
        { Location: 'TextInputLine' },
        { Duration: 'TextInputLine' },
        { 'Songs/Bhajans': 'TextInputLine' },
        { Experience: 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Other',
      Body: [
        { Purpose: 'TextInputLine' },
        { Address: '' },
        { Website: 'TextInputLine' },
        { Notes: 'TextInputParagraph' }
      ]
    }
  ]
};

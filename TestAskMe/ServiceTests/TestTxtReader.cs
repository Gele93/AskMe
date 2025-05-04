using AskMe.Services.Readers;

namespace TestAskMe.ServiceTests
{
    public class TestsTxtReader
    {
        private ITxtReader _txtReader;
        const string _validInputString = "##Theme1\n#Question1\n-Answer1\n##Theme2\n#Question2\n-Answer2";
        const string _validInputWithSpacesString = "## Theme1 \n# Question1 \n- Answer1 \n## Theme2 \n# Question2 \n- Answer2 ";
        const string _semiValidInputString = "##Theme1\n\n-Answer1\n\n#Question2\n-Answer2";

        [SetUp]
        public void Setup()
        {
            _txtReader = new TxtReader();
        }

        [Test]
        public async Task TestValidInputReturnsProperLineTypes()
        {
            var lines = await _txtReader.ReadStringByLines(_validInputString);

            Assert.Multiple(() =>
            {
                Assert.That(lines[0].IsTheme && !lines[0].IsQuestion);
                Assert.That(!lines[1].IsTheme && lines[1].IsQuestion);
                Assert.That(!lines[2].IsTheme && !lines[2].IsQuestion);
                Assert.That(lines[3].IsTheme && !lines[3].IsQuestion);
                Assert.That(!lines[4].IsTheme && lines[4].IsQuestion);
                Assert.That(!lines[5].IsTheme && !lines[5].IsQuestion);
            });
        }

        [Test]
        public async Task TestEmptyInputReturnsEmptyList()
        {
            var lines = await _txtReader.ReadStringByLines(string.Empty);

            Assert.That(lines, Is.Empty);
        }

        [Test]
        public async Task TestValidInputReturnsCorrectContent()
        {
            var lines = await _txtReader.ReadStringByLines(_validInputString);
            Assert.Multiple(() =>
            {
                Assert.That(lines[0].Content, Is.EqualTo("Theme1"));
                Assert.That(lines[1].Content, Is.EqualTo("Question1"));
                Assert.That(lines[2].Content, Is.EqualTo("Answer1"));
                Assert.That(lines[3].Content, Is.EqualTo("Theme2"));
                Assert.That(lines[4].Content, Is.EqualTo("Question2"));
                Assert.That(lines[5].Content, Is.EqualTo("Answer2"));
            });
        }

        [Test]
        public async Task TestValidInputWithSpacesReturnsCorrectContent()
        {
            var lines = await _txtReader.ReadStringByLines(_validInputWithSpacesString);
            Assert.Multiple(() =>
            {
                Assert.That(lines[0].Content, Is.EqualTo("Theme1"));
                Assert.That(lines[1].Content, Is.EqualTo("Question1"));
                Assert.That(lines[2].Content, Is.EqualTo("Answer1"));
                Assert.That(lines[3].Content, Is.EqualTo("Theme2"));
                Assert.That(lines[4].Content, Is.EqualTo("Question2"));
                Assert.That(lines[5].Content, Is.EqualTo("Answer2"));
            });

        }

        [Test]
        public async Task TestSemiValidInputReturnsCorrectLengthOfLines()
        {
            var lines = await _txtReader.ReadStringByLines(_semiValidInputString);
            Assert.That(lines.Count, Is.EqualTo(4));
        }
    }
}